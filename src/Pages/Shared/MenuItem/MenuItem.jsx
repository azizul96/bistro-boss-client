

const MenuItem = ({item}) => {
    const {name, price, image, recipe} = item
    return (
        <div className="flex space-x-2">
            <img style={{borderRadius: '0 150px 150px 150px'}} className="w-24 h-20" src={image} alt="" />
            <div>
                <h3 className="uppercase font-semibold">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500 font-semibold">${price}</p>
        </div>
    );
};

export default MenuItem;