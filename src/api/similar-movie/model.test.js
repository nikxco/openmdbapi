import { SimilarMovie } from '.'

let similarMovie

beforeEach(async () => {
  similarMovie = await SimilarMovie.create({ title: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = similarMovie.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(similarMovie.id)
    expect(view.title).toBe(similarMovie.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = similarMovie.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(similarMovie.id)
    expect(view.title).toBe(similarMovie.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
