import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No book details available</div>;
  }

  return (
    <div className="book-details p-6 pt-20 flex flex-col lg:flex-row">
      <div className="lg:w-1/2">
        <div className=" mt-6 lg:mt-0 lg:pl-10">
          <h1 className="text-3xl font-bold">Book Name: {book.name}</h1>
          <p className="mt-2">Category: {book.category}</p>
          <p>Tag Line: {book.title}</p>
          <p className="mt-2 mb-4">Price: Rs.{book.price}</p>


          <h2 className="text-2xl font-semibold">Description:</h2>
          <p className="mt-4">
            Immerse yourself in this captivating tale, where every page turns
            with excitement, intrigue, and emotion. A masterpiece in its genre,
            this book promises to take readers on an unforgettable journey
            through rich landscapes, deeply developed characters, and a plot
            that is both thrilling and thought-provoking. With its unique blend
            of adventure and emotional depth, this book appeals to a wide range
            of readers, offering something for everyone—whether you're a fan of
            mystery, drama, or heartfelt stories.
          </p>

          <h3 className="text-xl font-semibold mt-6">Author:</h3>
          <p className="mt-2">
            Written by an award-winning author known for weaving intricate
            narratives that resonate with readers of all ages, this novel has
            earned critical acclaim for its ability to balance powerful
            storytelling with profound insights into human nature.
          </p>

          <h3 className="text-xl font-semibold mt-6">Category:</h3>
          <p className="mt-2">
            Perfect for lovers of {book.category}, this book blends elements of
            suspense, drama, and philosophical reflection, making it both a
            page-turner and a thought-provoking read. It explores themes of
            personal growth, the importance of community, and the resilience of
            the human spirit.
          </p>

          <h3 className="text-xl font-semibold mt-6">Accolades:</h3>
          <p className="mt-2">
            - Featured in the New York Times Best Sellers list
            <br />
            - Winner of the Oscar Award
            <br />- Praised by literary critics for its originality and depth
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 flex flex-col items-center mt-4">
        <img src={book.image} alt={book.name} className="w-1/2 h-auto mt-4" />
      </div>
    </div>
  );
}

export default BookDetails;
