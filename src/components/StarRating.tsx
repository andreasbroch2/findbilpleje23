// Generate a star rating component using Google Places API and place name as props
export default function StarRating ({ placeName }) {
  const getStarRating = async (placeName) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=rating%2Cname&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('StarResponse', response);
    const data = await response.json().then((data) => {
      return data;
    });
    console.log('StarData', data);
    return data.candidates[0];
  };
  var name = '';
  var rating = 0;
  getStarRating(placeName).then((data) => {
    name = data.name;
    rating = data.rating;
    });
  return (
    <div>
        <div>
          <p>{name}</p>
          <p>{rating}</p>
        </div>
    </div>
  );
}