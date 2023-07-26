import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getNavMenu, getSingleDetailer, getAllDetailers, addCountMutation } from '../../lib/api'
import Image from 'next/image'
import Header from '../../components/header'
import Link from 'next/link'

export default function Post({ product, preview, footerMenuItems, menuItems }) {

  const router = useRouter()
  const handleReadMoreClick = async (id, fieldName) => {
    const result = await addCountMutation(id, fieldName);
  }

  if (!router.isFallback && !product?.slug) {
    return "Loading..."
  }

  return (
    <Layout data={product}>
      {product ? (
        <Container>
          <div className="single-product mx-auto mb-8 px-4 xl:px-0">
            <div className="grid md:grid-cols-2 gap-4 mb-8 bg-light p-8">
              <div className="p-8">
                <Image
                  src={product?.featuredImage?.node.sourceUrl}
                  alt={product?.featuredImage?.node.altText}
                  width="1000"
                  height="1000"
                />
              </div>
              <div className="p-8">
                <h1 className="uppercase mb-8">{product?.title}</h1>
                <div

                  dangerouslySetInnerHTML={{
                    __html: product?.content,
                  }}
                  className="product-description mb-5"
                />
                <Link href={product.detailers.link} target='_blank' onClick={() => handleReadMoreClick(product.databaseId, 'external_clicks')}>
                  <div className="btn btn-primary w-fit">Besøg</div>
                </Link>
              </div>
            </div>
            <div className="container mx-auto">
              <h2>Tjenester</h2>
              <div className="all-blog-posts-container container mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 my-8 pb-8">
                {(product?.detailers?.pakker).sort(function (a, b) { return a.services.pris - b.services.pris }).map((pakke, index) => {
                  return (
                    <div key={`${index}` ?? ''} className="blog-box flex flex-col items-center">
                      <h3>{pakke.title}</h3>
                      <div dangerouslySetInnerHTML={{ __html: pakke.services.indhold }}></div>
                      <div dangerouslySetInnerHTML={{ __html: pakke.services.andet }}></div>

                      <p>Estimeret tid: {pakke.services.tid} timer</p>
                      <p className="text-xl">Pris: {pakke.services.pris} kr.</p>
                      <div className="flex gap-4 mt-auto">
                        <Link href={pakke.services.link2} target='_blank' onClick={() => handleReadMoreClick(pakke.databaseId, 'read_more_clicks')} >
                          <div className="btn btn-secondary">Læs mere</div>
                        </Link>
                        <Link href={pakke.services.link} target='_blank' onClick={() => handleReadMoreClick(pakke.databaseId, 'bestil_clicks')}>
                          <div className="btn btn-primary">Bestil</div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2>Lokationer</h2>
              <div className="flex my-8">
                {(product?.detailers?.lokationer).map((location, index) => {
                  return (
                    <div key={`${index}` ?? ''} className='basis-1/2'>
                      <iframe
                        width="600"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBGPS-pbI1-xxJCWzEyKhwD6DFRJldwMHg&q=${location.locations.vejnavn}+${location.locations.postnummer}+${product.title}`}>
                      </iframe>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      ) : (
        ''
      )
      }
    </Layout >
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getSingleDetailer(params?.slug)
  const menuItems = await getNavMenu('PRIMARY');
  const footerMenuItems = await getNavMenu('FOOTER');
  return {
    props: {
      product: data.detailer,
      menuItems,
      footerMenuItems,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllDetailers()
  return {
    paths: allPosts.edges.map(({ node }) => `/bilplejere/${node.slug}`) || [],
    fallback: true,
  }
}
