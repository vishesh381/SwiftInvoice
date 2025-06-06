import {useContext, useState} from "react";
import {assets} from "../../assets/assets.js";
import toast from "react-hot-toast";
import {addCategory} from "../../Service/CategoryService.js";
import {AppContext} from "../../context/AppContext.jsx";

const CategoryForm = () => {
    //const {setCategories, categories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const { loadCategories,loadItems } = useContext(AppContext);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Select image for category");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                console.log("response++"+response.data);
                //setCategories([...categories, response.data]);
                toast.success("Category added");
                await loadCategories();
                await loadItems();
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                });
                setImage(false);
            }
        }catch(err) {
            console.error(err);
            toast.error("Error adding category");
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                                </label>
                                <input type="file" name="image" id="image" className='form-control' hidden onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Category Name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                        rows="5"
                                       name="description"
                                       id="description"
                                       className="form-control"
                                       placeholder="Write content here.."
                                        onChange={onChangeHandler}
                                        value={data.description}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className="form-label">Background color</label>
                                <br/>
                                <input type="color"
                                       name="bgColor"
                                       id="bgcolor"
                                       onChange={onChangeHandler}
                                       value={data.bgColor}
                                       placeholder="#ffffff"
                                />
                            </div>
                            <button type="submit"
                                    disabled={loading}
                                    className="btn btn-warning w-100">{loading ? "Loading..." : "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;