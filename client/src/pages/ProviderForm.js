import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROVIDER } from '../utils/mutations';

const ProviderForm = () => {

    const walkId = {_id: "62cf1428960f60159dd87ae0"};
    const sitId = {_id: "62cf1428960f60159dd87ae1"};

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        image: '',
        category: "62cf1428960f60159dd87ae0",
        price: 0,
        availability: [],
    });

    const [addProvider, { error }] = useMutation(ADD_PROVIDER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            await addProvider({
                variables: {
                    name: formState.name,
                    description: formState.description,
                    image: formState.image,
                    category: formState.category,
                    price: parseFloat(formState.price),
                    availability: formState.availability,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center">
        <div>
            <div className="card">
                <h4 className="card-header">Create New Listing:</h4>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name">Your Name:</label>
                        <input
                            className="form-input"
                            placeholder="Your Name"
                            name="name"
                            type="text"
                            id="name"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Tell Us About Yourself:</label>
                        <input
                            className="form-input"
                            placeholder="Description of Services"
                            name="description"
                            type="text"
                            id="description"
                            value={formState.description}
                            onChange={handleChange}
                        />
                        <label htmlFor="image">Image URL:</label>
                        <input
                            className="form-input"
                            placeholder="Image (URL)"
                            name="image"
                            type="text"
                            id="image"
                            value={formState.image}
                            onChange={handleChange}
                        />
                        <label htmlFor="category">Choose a Category:</label>
                        <select 
                            value={formState.category}
                            name="category"
                            id="category"
                            onChange={handleChange}
                        >
                            <option value={walkId}>Walking</option>
                            <option value={sitId}>Sitting</option>
                        </select>
                        <label htmlFor="price">Your Rate:</label>
                        <input
                            className="form-input"
                            placeholder="Rate"
                            name="price"
                            type="number"
                            id="price"
                            value={formState.price}
                            onChange={handleChange}
                        />
                        <label htmlFor="availability">Availability:</label>
                        <select 
                            multiple={true}
                            value={[formState.availability]}
                            name="availability"
                            id="availability"
                            onChange={handleChange}
                        >
                            <option value="Mon 8-10AM">Mon 8-10AM</option>
                            <option value="Mon 5-7PM">Mon 5-7PM</option>
                            <option value="Tue 8-10AM">Tue 8-10AM</option>
                            <option value="Tue 5-7PM">Tue 5-7PM</option>
                            <option value="Wed 8-10AM">Wed 8-10AM</option>
                            <option value="Wed 5-7PM">Wed 5-7PM</option>
                            <option value="Thu 8-10AM">Thu 8-10AM</option>
                            <option value="Thu 5-7PM">Thu 5-7PM</option>
                            <option value="Fri 8-10AM">Fri 8-10AM</option>
                            <option value="Fri 5-7PM">Fri 5-7PM</option>
                            <option value="Sat 8-10AM">Sat 8-10AM</option>
                            <option value="Sat 5-7PM">Sat 5-7PM</option>
                            <option value="Friday - Sunday">Friday - Sunday</option>
                        </select>
                        <button className="btn d-block w-100" type="submit">
                            Submit
                        </button>
                    </form>
                    {error && <div>Something has gone wrong. Sorry.</div>}
                </div>
            </div>
        </div>
        </main>
    );
};

export default ProviderForm;