

const FoodCard = ({item}) => {
    const {name, price, image, recipe} = item
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl rounded-none">
                <figure><img className="object-cover w-full h-56" src={image} alt="Shoes" /></figure>
                <p className="absolute bg-slate-900 text-white right-0 mr-4 mt-4 px-3">${price}</p>
                <div className="card-body ">
                    <h2 className="card-title justify-center">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center ">
                    <button className="btn btn-md btn-outline border-0 border-b-4 text-yellow-600">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;