import React, { useState, useEffect } from "react";

const RESOURCE_TYPES = ['blog', 'video', 'book']

const ResourceForm = (props) => {
    const [uResource, setUResource] = useState(props.resource)

    useEffect(() => {
        setUResource(props.resource);
    }, [props.resource])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUResource({...uResource, [name]: value})
    }

    const handleSubmit = () => {
        props.onSubmit(uResource);
    }

    return(
        <>
            { props.notification?.success &&
                <div className="alert alert-success">{props.notification.success}</div>
            }
            { props.notification?.error &&
            <div className="alert alert-danger">{props.notification.error}</div>
            }
            <form>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={handleChange}
                        value={uResource.title}
                        name="title"
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="How to survive in mountains"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        onChange={handleChange}
                        value={uResource.description}
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Just some description"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="link">Resource Link</label>
                    <div className="input-group">
                        <input
                            onChange={handleChange}
                            value={uResource.url}
                            name="url"
                            type="text"
                            className="form-control"
                            id="url"
                            placeholder="Username"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="type">Type</label>
                    <select
                        onChange={handleChange}
                        className="form-control"
                        name="resource_type"
                        value={uResource.resource_type}
                        id="resource_type">
                        { RESOURCE_TYPES.map(type =>
                            <option key={type} value={type}>{type}</option>
                        )
                        }
                    </select>
                </div>
                <hr className="mb-4"/>
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-lg btn-block"
                    type="button">Submit</button>
            </form>
        </>
    )
}

export default ResourceForm