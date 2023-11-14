import { useState } from "react"
import UserList from "../components/Admin/UserList"
import NewUser from "../components/Forms/NewUserForm"
import InstrumentRegistryForm from "../components/Forms/InstrumentRegistryFrom"

function Admin() {

    
    return (
        <div>
            <UserList />
            <NewUser />
            <InstrumentRegistryForm />
        </div>
    )
}

export default Admin
