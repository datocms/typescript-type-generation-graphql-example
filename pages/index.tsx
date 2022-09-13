import { GetStaticProps, NextPage } from "next"
import { Image as DatoImage } from "react-datocms"
import { HomeDocument, HomeQuery } from "../graphql/generated"
import { request } from "../lib/request"

const Home: NextPage<Props> = ({ result }) => {
  return (
    <ul>
      {result.allArticles.map((article) => (
        <li key={article.id}>
          {article.title} {article.image?.responsiveImage && <DatoImage data={article.image.responsiveImage} />}
        </li>
      ))}
    </ul>
  )
}

type Props = { result: HomeQuery }

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // retrieving the list of all articles
  const result = await request(HomeDocument)

  return {
    props: { result },
  }
}

export default Home
