import React, { Component, useState, useEffect } from "react";

const ResourceList = (props) => {
    return(
        <ul className="list-group mb-3 resource-list">
            { props.resources.map((resource) =>
                <li
                    onClick={() => props.onItemClick(resource)}
                    key={resource.id}
                    className={`${props?.activeId === resource.id ? 'is-active' : ''} list-group-item d-flex justify-content-between lh-condensed resource-list-item`}>
                    <div>
                        <h6 className="my-0">{resource.title}</h6>
                        <small className="text-muted">{resource.description}</small>
                    </div>
                    <span className="text-muted">{resource.resource_type}</span>
                </li>
            ) }
        </ul>
    )
}

export default ResourceList;