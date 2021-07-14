import express from "express"

export default class App {

  public app: express.Application
  public port: any
  
  constructor(routes: any, port: number){
    this.app = express()
    this.port = port
    this.initializeMiddlewares()
    this.initializeRouters(routes)
  }

  public initializeMiddlewares = () => {
    this.app.use(express.urlencoded({
      extended: true
    }))
    
    this.app.use(express.json())
  }

  private initializeRouters(routes: any) {
    routes.forEach((route: any) => {
      this.app.use(route.path, route.router);
    });
    this.app.get('/', (req, res) => res.send('Express + TypeScript Server'));
  }

  public listen() {
    this.app.listen(this.port, "0.0.0.0", () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}


