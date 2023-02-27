export type PostType = {
    id:any
    title?:any 
    updatedAt?: any
    user?: {
      email?: any
      id?: any
      image?: any
      name?: any
    }
    comment?: {
      createdAt?:any 
      id?: any
      postId?: any
      title?: any
      userId: any
      user?: {
        email?:any 
        id?: any
        image?:any 
        name: any
      }
    }[]
  }