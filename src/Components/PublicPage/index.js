import React, { useState } from 'react';
const PublicPage = () => {
    const [title] = useState('This is functional component that used React Hooks!');
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <h1>This is public Page</h1>
                    <p>{title}</p>

                </div>

            </div>

        </div>
    );
}
export default PublicPage