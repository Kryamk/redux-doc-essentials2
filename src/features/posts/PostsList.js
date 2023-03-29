import classnames from 'classnames';
import React, { useEffect } from 'react'
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useGetPostsQuery } from '../api/apiSlice';
import PostAuthor from './PostAuthor';
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import { TimeAgo } from './TimeAgo';


let PostExcerpt = ({ post }) => {
	// const post = useSelector(state => selectPostById(state, postId))
	return (
		<article className='post-excerpt'>
			<h3>{post.title}</h3>
			<div>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p className='post-content'>{post.content.substring(0, 100)}</p>
			<ReactionButtons post={post} />
			<Link to={`/posts/${post.id}`} className="button muted-button"> View Post </Link>
		</article>
	)
}

const PostsList = () => {
	/* const dispatch = useDispatch()
	const orderedPostIds = useSelector(selectPostIds)

	const postStatus = useSelector(state => state.posts.status)
	const error = useSelector(state => state.posts.error)

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])

	let content
	if (postStatus === 'loading') {
		content = <Spinner text="Loadeng..." />
	}
	else if (postStatus === 'succeded') {
		content = orderedPostIds.map(postId => (
			<PostExcerpt key={postId} postId={postId} />
		))
	}
	else if (postStatus === 'failed') {
		content = <div>{error}</div>
	} */

	const { data: posts = [], isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPostsQuery()

	const sortedPosts = useMemo(() => {
		return posts.slice().sort((a, b) => b.date.localeCompare(a.date))
	}, [posts])

	let content
	if (isLoading) {
		content = <Spinner text="Loading..." />
	}
	else if (isSuccess) {
		// content = sortedPosts.map(post => (<PostExcerpt key={post.id} post={post} />))
		const renderedPosts = sortedPosts.map(post => (<PostExcerpt key={post.id} post={post} />))
		const containerClassname = classnames('posts-container', {
			disabled: isFetching
		})
		content = <div className={containerClassname}>{renderedPosts}</div>
	}
	else if (isError) {
		content = <div>{error}</div>
	}

	return (
		<section className='posts-list'>
			<h2>Posts</h2>
			<button onClick={refetch}>Refetch Posts</button>
			{content}
		</section>
	)
}

export default PostsList












// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { Spinner } from '../../components/Spinner';
// import PostAuthor from './PostAuthor';
// import { fetchPosts,  selectAllPosts } from './postsSlice';
// import ReactionButtons from './ReactionButtons';
// import { TimeAgo } from './TimeAgo';


// let PostExcerpt = ({ post }) => {
// 	return (
// 		<article className='post-excerpt'>
// 			<h3>{post.title}</h3>
// 			<div>
// 				<PostAuthor userId={post.user} />
// 				<TimeAgo timestamp={post.date} />
// 			</div>
// 			<p className='post-content'>{post.content.substring(0, 100)}</p>
// 			<ReactionButtons post={post} />
// 			<Link to={`/posts/${post.id}`} className="button muted-button"> View Post </Link>
// 		</article>
// 	)
// }
// PostExcerpt = React.memo(PostExcerpt)

// const PostsList = () => {
// 	const dispatch = useDispatch()
// 	const posts = useSelector(selectAllPosts)

// 	const postStatus = useSelector(state => state.posts.status)
// 	const error = useSelector(state => state.posts.error)

// 	useEffect(() => {
// 		if (postStatus === 'idle') {
// 			dispatch(fetchPosts())
// 		}
// 	}, [postStatus, dispatch])


// 	/* const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

// 	const renderPosts = orderPosts.map(post => (
// 		<article className='post-excerpt' key={post.id}>
// 			<h3>{post.title}</h3>
// 			<div>
// 				<PostAuthor userId={post.user} />
// 				<TimeAgo timestamp={post.date} />
// 			</div>
// 			<p className='post-content'>{post.content.substring(0, 100)}</p>
// 			<ReactionButtons post={post} />
// 			<Link to={`/posts/${post.id}`} className="button muted-button"> View Post </Link>
// 		</article>
// 	)) */

// 	let content

// 	if (postStatus === 'loading') {
// 		content = <Spinner text="Loadeng..." />
// 	}
// 	else if (postStatus === 'succeded') {
// 		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
// 		content = orderedPosts.map(post => (
// 			<PostExcerpt key={post.id} post={post} />
// 		))
// 		// content = orderedPostIds.map(postId => (
// 		// 	<PostExcerpt key={postId} postId={postId} />
// 		// ))
// 	}
// 	else if (postStatus === 'failed') {
// 		content = <div>{error}</div>
// 	}

// 	return (
// 		<section className='posts-list'>
// 			<h1>Posts</h1>
// 			{content}
// 		</section>
// 	)
// }

// export default PostsList
