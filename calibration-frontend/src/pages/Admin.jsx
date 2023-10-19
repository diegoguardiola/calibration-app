import { useState } from "react"
import NewUser from "../components/Forms/NewUserForm"
import InstrumentRegistryForm from "../components/Forms/InstrumentRegistryFrom"

function Admin() {

    
    return (
        <div>
            <NewUser />
            <InstrumentRegistryForm />
        </div>
    )
}

export default Admin
