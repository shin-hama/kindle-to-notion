import type { Meta, StoryObj } from '@storybook/react'
import { ScrapingProgressPresentation } from './Progress.presentation'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ScrapingProgressPresentation',
  component: ScrapingProgressPresentation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ScrapingProgressPresentation>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Title テスト',
    current: 1,
    total: 10,
    userPageUrl: 'https://notion.so',
  },
}
