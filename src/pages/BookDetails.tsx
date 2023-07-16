import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);

  const book = data?.data;
  let date;
  if (book?.publicationTime) {
    date = book?.publicationTime.toString().split("T")[0];
  }
  return (
    <div>
      {book && (
        <div className="max-w-7xl mx-auto px-2">
          <div className="md:flex gap-4">
            <div className="bg-slate-200  md:w-1/3 flex justify-center">
              <img src={book?.image} alt="book photo" />
            </div>
            <div className="md:w-2/3 mt-12 mx-4">
              <div>
                <h4 className="text-2xl font-semibold ">
                  Title: {book?.title}{" "}
                </h4>
                <h4 className="text-2xl font-semibold ">
                  Author: {book?.author}
                </h4>
                <h4 className="text-2xl font-semibold ">
                  Genre: {book?.genre}
                </h4>
                <p className="text-md font-semibold">
                  Publication Date: {date}
                </p>
              </div>
              <div className="mt-4">
                {!(user?.email === book?.authorEmail) && (
                  <>
                    <Link to={`/update-book/${book?._id}`}>
                      {" "}
                      <button className="btn text-white mr-2 px-16 mb-2 bg-green-500 hover:bg-green-600">
                        Edite Book
                      </button>
                    </Link>
                    <button className="btn text-white mr-2 px-[60px] mb-2 bg-red-500 hover:bg-red-600">
                      Delete Book
                    </button>
                  </>
                )}
                <button className="btn text-white mr-2 px-12 mb-2 bg-slate-500 hover:bg-slate-600">
                  Add To Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className=" ml-4 mt-8 mb-4">
            <h2 className="text-2xl font-bold mb-3">Reviews:</h2>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                />
                <button className="btn bg-lime-500 ">Comment</button>
              </div>
            </div>
            {book.reviews.map((review: string) => (
              <p className="mb-4">
                <span className="bg-slate-200 px-2 py-1 rounded-lg mb-2">
                  {review}
                </span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
