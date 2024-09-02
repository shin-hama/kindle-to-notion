import { parseToDate } from './parseBooks'

describe('parseToDate: 各国のAmazonの日付表記に対応したDateオブジェクトを返す', () => {
  describe('English', () => {
    it('Should return Date object', () => {
      const date = parseToDate('Sunday October 24, 2021', 'global')
      expect(date).toEqual(new Date(2021, 9, 24))
    })
  })

  describe('Japan', () => {
    it('Should return Date object', () => {
      const date = parseToDate('2022年12月21日 水曜日', 'japan')
      expect(date).toEqual(new Date(2022, 11, 21))
    })
  })

  describe('France', () => {
    it('Should return Date object', () => {
      const date = parseToDate('mardi août 30, 2022', 'france')
      expect(date).toEqual(new Date(2022, 7, 30))
    })
  })
})
