import { Client, isFullBlock, isFullPage, isFullUser } from '@notionhq/client'
import { Result } from '../types'
import { UsersService } from '../services/users'
import { Env } from '../types'

export const notionHandler = async (
  code: string,
  env: Env,
): Promise<
  Result<{
    session_token: string
    redirect_url: string
  }>
> => {
  const oauthClient = new Client()
  const response = await oauthClient.oauth.token({
    code,
    grant_type: 'authorization_code',
    redirect_uri: env.NOTION_REDIRECT_URL,
    client_id: env.NOTION_CLIENT_ID,
    client_secret: env.NOTION_CLIENT_SECRET,
  })

  if (response.owner.type !== 'user' || !isFullUser(response.owner.user)) {
    return {
      error: 'Invalid user',
    }
  }

  const usersService = new UsersService(
    env.NOTION_CLIENT_ID,
    env.NOTION_CLIENT_SECRET,
    env.ENCRYPTION_KEY,
  )
  await usersService.saveUser({
    id: response.bot_id,
    notion_uid: response.owner.user.id,
    avatar_url: response.owner.user.avatar_url,
    bot_id: response.bot_id,
    name: response.owner.user.name,
    workspace_id: response.workspace_id,
    workspace_name: response.workspace_name,
    workspace_icon: response.workspace_icon,
  })

  await usersService.saveSecret({
    access_token: response.access_token,
    user_id: response.bot_id,
  })

  console.log('Successfully authenticated user')

  console.log("Start parsing user's page")

  const userClient = new Client({
    auth: response.access_token,
  })
  if (!response.duplicated_template_id) {
    return {
      error:
        "Template page doesn't duplicated, please try again and make sure to duplicate the template",
    }
  }

  for (let i = 0; i < 5; i++) {
    try {
      const databases = await findDatabases(userClient, response.duplicated_template_id)
      await usersService.savePage({
        user_id: response.bot_id,
        page_id: response.duplicated_template_id,
        books_db_id: databases.books,
        highlights_db_id: databases.highlights,
      })

      const url = await userClient.pages
        .retrieve({
          page_id: response.duplicated_template_id,
        })
        .then((page) => (isFullPage(page) ? page.url : 'https://www.notion.so/'))
        .catch(() => 'https://www.notion.so/')
      return {
        data: {
          session_token: response.bot_id,
          redirect_url: url,
        },
      }
    } catch (e) {
      // 作成直後のページを取得できないことがあるためリトライ
      console.warn(e)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return {
    error: 'Failed to create page',
  }
}

const findDatabases = async (
  userClient: Client,
  duplicated_template_id: string,
): Promise<{
  books: string
  highlights: string
}> => {
  const children = await userClient.blocks.children.list({
    block_id: duplicated_template_id,
  })

  return children.results.reduce(
    (acc, block) => {
      if (isFullBlock(block) && block.type === 'child_database') {
        if (block.child_database.title === 'Books') {
          acc.books = block.id
        } else if (block.child_database.title === 'Highlights') {
          acc.highlights = block.id
        }
      }
      return acc
    },
    { books: '', highlights: '' },
  )
}
