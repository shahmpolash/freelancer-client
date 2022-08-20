import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Categories = () => {
    const navigate = useNavigate();
    const [categoris, setCategoris] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/categoris`
        fetch(url)
            .then(res => res.json())
            .then(data => setCategoris(data));

    }, []);


    const handleCategory = event => {
        event.preventDefault();
        const categoryName = event.target.categoryName.value;
        const slug = event.target.slug.value;
        const categoryDescription = event.target.categoryDescription.value;
        const adminDetails = { categoryName, slug, categoryDescription }

        const url = `http://localhost:5000/categoris`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminDetails)
        })
            .then(res => res.json())
            .then(result => {

                navigate('/admin');

            })
    }

    return (
        <div className='container'>
            <h2>Total {categoris.length} Categoris</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>View</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                {
                    categoris.map(category =>
                        <tbody>
                    <tr>
                        <td>1</td>
                        <td>{category.categoryName}</td>
                        <td><Link to={`/category/${category.slug}`}>View</Link></td>
                        <td><Link to={`/edit-category/${category._id}`}>Edit</Link></td>
                    </tr>                   
                </tbody>
                        )
                }
                
            </Table>
            <form onSubmit={handleCategory}>
                <input type="text" name="categoryName" id="" placeholder='Category Name' />
                <input type="text" name="slug" id="" placeholder='Category Slug without Space' />
                <textarea type="text" name="categoryDescription" id="" placeholder='Category Description' />
                <input type="submit" value="Add Category" />
            </form>
        </div>
    );
};

export default Categories;