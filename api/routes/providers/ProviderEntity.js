
class Provider{
    constructor({id, empresa, email, categoria, createdAt, updatedAt, version }){

        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }

    constructor({empresa, email, categoria}){
        //this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        //this.createdAt = createdAt
        //this.updatedAt = updatedAt
        //this.version = version
    }


}

module.exports = Provider