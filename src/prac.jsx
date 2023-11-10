import { useEffect, useState } from "react";
import $ from 'jquery';


export function Prac(){

    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        $.ajax({
            method:"get",
            url:"https://fakestoreapi.com/products/categories",
            success:(category)=>{
                setCategories(category);
                console.log(category);
            }
        })
    },[])

    return (
        <div className="container-fluid m-4">
            <h2>Api demo</h2>
            <select>
                {
                    categories.map((category)=>{
                        return <option>{category}</option>
                    })
                }
            </select>
        </div>
    )
}   