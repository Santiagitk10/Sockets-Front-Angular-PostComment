export type Post = {
    aggregateId: string,
    author: string,
    title: string,
    comments: CommentType[]
}

export type CommentType = {
    id: string,
    postId: string,
    author: string,
    content: string
}

export type CreatePostCommand = {
    postID: string,
    title: string,
    author: string
}

export type CreateCommentCommand = {
    postID: string,
    commentID: string,
    author: string,
    content: string
}

export type IToken = {
    token:string
}