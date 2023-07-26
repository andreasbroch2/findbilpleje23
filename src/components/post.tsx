import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';

const Post = ({ post }) => {
	var servicearray = post?.detailers.tjenester;
	// Call Google Places API to get star rating of detailers location

	return (
		<div className="flex place-content-between items-center p-4">
			<div>
				<figure className="overflow-hidden relative h-32 w-32">
					<Image className='blog-box-image object-contain relative' src={post?.featuredImage.node.sourceUrl} alt={post?.featuredImage.node.altText} fill title={post?.title ?? ''} sizes="
						(max-width: 768px) 100vw,
						(max-width: 1280px) 50vw,
						33vw"
					/>
				</figure>
				{/* Insert star rating using getStarRating function with post.title */}
				<StarRating placeName={post?.title ?? ''} />
			</div>
			<div className='textbox basis-1/2'>
				<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{ __html: post?.title ?? '' }} />
				<div dangerouslySetInnerHTML={{ __html: post?.content ?? '' }} />
				{/* Loop through a custom field select type field with key value pairs */}

				<div className="flex gap-2">
					{Object.values(servicearray).map((service: string, index) => {
						return (
							<div key={`${index}` ?? ''} className="badge-secondary">
								{/* Split the string after ': ' */}
								{service.split(': ')[1]}

							</div>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="metaitem">
					<p className="mb-0">Priser fra: <span className="font-bold">{post?.detailers?.priserFra ?? ''} kr.</span></p>
				</div>
				<div className="flex gap-4">
					{/* Loop through Locations and create a item for each */}
					{(post?.detailers?.lokationer).map((location, index) => {
						return (
							<div key={`${index}` ?? ''} className="badge-primary">
								{location.locations.vejnavn} <br />
								{location.locations.sted}
							</div>
						);
					})}
				</div>
				<div className="metaitem">
					{/* Display the opening hours. Create new lines on  \r\n */}
					<p className="text-xs" dangerouslySetInnerHTML={{ __html: post?.detailers?.aabningstider.replace(/\r\n/g, '<br />') ?? '' }} />
				</div>
			</div>
			<div className="buttonbox">
				<Link href={`/bilplejere/${post?.slug ?? ''}`}>
					<div className="btn">Læs mere</div>
				</Link>
			</div>
		</div>
	);
};

export default Post;
