import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faTools, faShieldAlt, faWarehouse } from '@fortawesome/free-solid-svg-icons';

function WhyUs({ Icon, Icon2, Icon3 }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // Input change handler with case-insensitive filtering
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            // Filter suggestions based on input (case-insensitive matching)
            const matchingSuggestions = Object.keys(pageMapping).filter(keyword =>
                keyword.toLowerCase().includes(value.toLowerCase()) // Case-insensitive comparison
            );
            setSuggestions(matchingSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const destination = pageMapping[suggestion];
        navigate(destination);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Generate slug from the search term
        const slug = generateSlug(searchTerm);

        // Check if the slug matches any key in the pageMapping
        const destination = pageMapping[slug] || "/";
        
        // Navigate to the matched URL or fallback URL
        navigate(destination);
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
    };

    const pageMapping = {
        "Electrician": "/electrician-services",
        "Plumber": "/plumber-services",
    };

    const images = [Icon, Icon2, Icon3]; // Add more images if needed

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div>
            <section className="flex flex-col items-center bg-gray-100 p-[10%] z-1 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}
            >
                <form onSubmit={handleSearch} 
                className="p-4 w-full max-w-md  rounded-md mt-10 relative" 
            
                >
                    <input
                        type="text"
                        placeholder="Start your search here. Example: Plumber, Electrician etc."
                        className="p-4 w-full border border-gray-300 rounded-md mt-10"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute  w-[93%] border border-gray-300 rounded shadow-lg bg-white">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer max-w-md font-bold hover:bg-gray-200"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </section>

            <section className='p-8 sm:w-[90%] bg-white border border-solid sm:ml-[5%] lg:translate-y-[-100px] z-10'>
                <div className='text-center text-xl text-black font-bold '>Why Us?</div>

                <div className='sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 text-gray-500'>

                    <div className='ml-[17%] lg:ml-0'>
                        <FontAwesomeIcon icon={faUserTie} className="text-gray-500 mt-5 lg:mt-0 text-4xl  ml-20" />
                        <p className='lg:text-xl mt-5'>Dedicated Relationship Manager</p>
                    </div>

                    <div className='ml-[17%] lg:ml-0'>
                        <FontAwesomeIcon icon={faTools} className="text-gray-500 mt-5 lg:mt-0 text-4xl ml-20" />
                        <p className=' lg:text-xl mt-5'>Trained In-House Professionals</p>
                    </div>

                    <div className='ml-[17%] lg:ml-0'>
                        <FontAwesomeIcon icon={faShieldAlt} className="text-gray-500 mt-5 lg:mt-0 text-4xl ml-20" />
                        <p className='lg:text-xl mt-5'>100% Service Warranty Sure</p>
                    </div>

                    <div className='ml-[17%] lg:ml-0'>
                        <FontAwesomeIcon icon={faWarehouse} className="text-gray-500 mt-5 lg:mt-0 text-4xl ml-20" />
                        <p className='lg:text-xl mt-5'>One Stop Maintenance At Will</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default WhyUs;
