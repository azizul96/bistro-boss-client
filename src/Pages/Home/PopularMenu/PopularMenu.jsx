
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    // using custom hook useMenu.
    const [ menu ] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')


    console.log(menu);
    return (
        <section className="mb-10">
            <SectionTitle 
            heading="From Our Menu" 
            subHeading="Popular Items">
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-6">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;