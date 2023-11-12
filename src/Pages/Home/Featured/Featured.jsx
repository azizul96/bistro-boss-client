import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        // style={{backgroundImage: `url(${featuredImg})`}}
        <div  className="featured-item bg-fixed text-white pt-10 mb-10">
            <SectionTitle subHeading="Check it Out" heading="Featured Item"></SectionTitle>

            <div className="md:flex justify-center items-center pt-5 pb-20 px-32 gap-5">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div>
                    <p>Aug 20, 2023</p>
                    <p className="uppercase">Where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quae aliquid asperiores nulla. Rem, ab blanditiis, eius atque culpa temporibus reprehenderit non sint iusto accusantium est eaque praesentium laboriosam dignissimos quae ducimus, pariatur repellat. Iure alias, ea dolore ipsum vel quas placeat, mollitia possimus, id adipisci voluptatibus? Consequatur, obcaecati beatae?</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white mt-5 ">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;