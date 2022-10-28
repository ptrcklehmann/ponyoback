import Link from 'next/link'
import Header from '../components/header'

import blogStyles from '../styles/blog.module.css'
import sharedStyles from '../styles/shared.module.css'

import { getBlogLink, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'
import { Chrono, TimelineItem } from 'react-chrono'
import { time } from 'console'

const popoImageUrl = 'https://findingponyo.vercel.app/popo.png'
const popoBabyImageUrl = 'https://findingponyo.vercel.app/popo_baby.jpeg'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Index = ({ posts = [], preview }) => {
  const timeLineItems: TimelineItem[] = [
    {
      title: '15.09.2015',
      cardTitle: 'Geboren',
      url: 'https://goo.gl/maps/HNieXu9d1awgUaCH7',
      cardSubtitle: 'In der Dorfstraße 8, Doberlug-Kirchhain',
      cardDetailedText: '1 von 8 Geschwistern',
      media: {
        type: 'IMAGE',
        source: {
          url: popoBabyImageUrl,
        },
      },
    },
  ]
  return (
    <>
      <Header titlePre="Bring back Popo" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>Bring back Popo</h1>
        <img src={popoImageUrl} width={'40%'} alt="Popo the dog" />
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndexBio}`}>
          <Chrono items={timeLineItems} />
        </div>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <Link href="/[slug]" as={getBlogLink(post.Slug)}>
                    <a>{post.Page}</a>
                  </Link>
                </span>
              </h3>
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Index
