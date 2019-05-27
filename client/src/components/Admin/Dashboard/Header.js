import React from 'react'
import './Dashboard.css'

export default function Header() {
    return (
        <section className="flex blue-background h-56 justify-center items-center text-center">
            <div className="p-4">
                <h2 className="text-2xl body-font font-black text-second-blue">New Messages</h2>
                <p className="text-6xl body-font font-semibold number-gray">3</p>
                <button className="text-white view-more-sm bg-blue-900">
                    <p className="font-medium w-3/4 text-xl pl-3 ">View All</p>
                    <i className="text-2xl w-1/4 far fa-arrow-alt-circle-right justify-s-end"></i>
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-2xl body-font font-black text-second-blue">Current Dogs</h2>
                <p className="text-6xl body-font font-semibold number-gray">12</p>
                <button className="view-more-sm text-white bg-blue-900">
                    <p className="font-medium w-3/4 text-xl pl-3">View All</p>
                    <i className="text-2xl w-1/4 far fa-arrow-alt-circle-right justify-s-end"></i>
                </button>
            </div>
        </section>
    )
}
