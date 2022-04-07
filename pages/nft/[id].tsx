import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";


interface Props{
  collection:Collection[]
}

const NFTdDropPage = ({collection}:Props) => {




    //Auth
    const connectWithMetmask=useMetamask()
    const address = useAddress()
    const disconnect=useDisconnect()

   

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left       */}
      <div className=" lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col  items-center justify-center py-2 lg:min-h-screen">
          <div className=" rounded-lg p-2 bg-gradient-to-br from-yellow-400 to0purple-600">
            <img
              src={urlFor(collection.PreviewImage.asset).url()}
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              alt=""
            />
          </div>
          <div className="space-y-2 text-center p-5">
            <h1 className="text-4xl font-bold text-white">{collection.nftCollectionName}</h1>
            <h2>{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* right  */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header  */}
        <header className="flex items-center justify-between">
          <Link href={`/`}>
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-88">
            The <span className="font-extrabold">PAPAFAM </span> {` `} NFT
            Market place
          </h1>
          </Link>
          <button className="rounded-full bg-rose-400 px-4 text-white py-2 lg:px-5 lg:py-3 lg:text-base "
          onClick={()=>( address ? disconnect(): connectWithMetmask())}
          >
            {" "}
           {address ? `Sign Out`: "Sign In"}
          </button>
        </header>

        <hr className="my-2 border" />

        {collection.address && (
            <p className="text-center text-sm text-rose-400" >You're logged in with wallet {collection.address}</p>
        )}

        {/* body  */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 lg:justify-center lg:space-y-0 ">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage.asset).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-bold">
            {collection.title}
          </h1>

          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>
        {/* button  */}

        <button className="h-16 w-full bg-red-600 text-white rounded-full mt-10 font-bold">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
};

export default NFTdDropPage;

export const getServerSideProps: GetServerSideProps=async({params})=>{

  const query = `*[_type == "collection" &&  slug.current == $id][0] {
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
      asset
    },
    PreviewImage{
      asset
    },
    slug{
      current
    },
    slug{
      current
    },
    creator->{
      _id,
      name,
      address,
      slug{
        current
      },
    },
  }`

  const collection = await sanityClient.fetch(query,{
    id:params?.id
  })

  //returns 404 error page
  if(! collection ){

    return {
      notFound: true
    }
  }

  return {
    props:{
      collection
    }
    
  

    
  }



}