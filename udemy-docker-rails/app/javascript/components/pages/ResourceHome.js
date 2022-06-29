import React, {useEffect, useState} from "react";

import ResourceSearch from "../ResourceSearch";
import ResourceList from "../ResourceList";
import ResourceUpdate from "../ResourceUpdate";
import ResourceCreate from "../ResourceCreate";
import ResourceDetail from "../ResourceDetail";
import Header from "../Header";

const ResourceHome = () => {
    const [resources, setResources] = useState([])
    const [detailView, setDetailView] = useState(true)
    const [selectedResource, setSelectedResource] = useState()

    useEffect(() => {
        fetch('/api/v1/resources', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
            }
        }).then(response => response.json())
            .then(result => {
                setResources(result.resources);
            })
    }, [])

    const hasResources = resources && resources.length > 0;
    const activeResource = selectedResource || (hasResources && resources[0]) || null;

    const findResourceIndex = resource => {
        return resources.findIndex(r => r.id === resource.id);
    }

    const updateResourceList = resource => {
        const resourceIndex = findResourceIndex(resource);
        const copy = [...resources];
        copy[resourceIndex] = resource;
        return copy;
    }

    const handleResourceCreate = createdResource => {
      const updatedResources = updateResourceList(createdResource);

      setResources(updatedResources);
      setSelectedResource(createdResource);
  }

    const handleResourceUpdate = updatedResource => {
        const updatedResources = updateResourceList(updatedResource);

        setResources(updatedResources);
        setSelectedResource(updatedResource);
    }

    return(
        <div className="container">
            <Header/>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your Resources</span>
                        <span>{resources.length}</span>
                    </h4>
                    <ResourceSearch/>
                    <ResourceList
                        onItemClick={setSelectedResource}
                        resources={resources}
                        activeId={activeResource?.id}
                    />
                    <button className="btn btn-primary"
                      onClick={ () => handleResourceCreate }>
                      Add Resource</button>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Resource
                      <button
                          onClick={ () => setDetailView(!detailView) }
                          className={`btn btn-sm m-lg-2 ${detailView ? 'btn-warning' : 'btn-primary'}`}>
                          { detailView ? 'Edit' : 'Detail' }
                      </button>
                    </h4>
                    { detailView ?
                        <ResourceDetail resource={activeResource}/> :
                        <ResourceUpdate onUpdate={handleResourceUpdate}
                                        resource={activeResource}/> }
                </div>
            </div>
        </div>
    )
}

export default ResourceHome;