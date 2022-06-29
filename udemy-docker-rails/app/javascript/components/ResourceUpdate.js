import React, { useState, useRef, useEffect } from "react";

import ResourceForm from "./ResourceForm";

const initNotification = () => ({success: null, error: null})

const ResourceUpdate = (props) => {
    const [notification, setNotification] = useState(initNotification);
    const timeoutId = useRef(null);

    const resourceId = props.resource?.id
    const resetNotification = () => setNotification(initNotification);
    const resetTimeout = () => timeoutId?.current && clearTimeout(timeoutId.current);

    useEffect(() => {
        resetNotification();
        resetTimeout();
        return () => resetTimeout();
    }, [resourceId]);

    const displayNotification = (type, message) => {
        const _notification = initNotification();
        _notification[type] = message;
        setNotification(_notification);
        timeoutId.current = setTimeout(() => {
            resetNotification();
        }, 3000);
    }

    const updateResource = (resourceData) => {
        fetch(`/api/v1/resources/${resourceData.id}`, {
            method: 'PATCH',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
            },
            body: JSON.stringify({ resource: resourceData })
        }).then(response => response.json())
            .catch(err => {
                displayNotification('error', err);
            })
            .then(result => {
                props.onUpdate(result.resource);
                displayNotification('success', 'Resource was updated');
            })
    }

    return(
        <ResourceForm
            onSubmit={updateResource}
            resource={props.resource}
            notification={notification}
        />
    )
}

export default ResourceUpdate;