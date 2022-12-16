import axios from "axios";
import {useEffect, useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemListAction, deleteItemAction, toggleItemAction} from "../Redux/ReduxStore";

export const PostList = () => {
    const url = 'https://fakestoreapi.com/products?limit=5'
    const state = useSelector(store => store.itemListState)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState(false)

    const fState = filter ? state.filter((item) => item.liked) : state
    const filterText = filter ? 'Reset filter' : 'Filter by'

    useEffect(() => {
        axios.get(url).then((resp) => {
            let items = resp.data.slice()
            for (let item of items) {
                item.liked = false
            }
            dispatch(addItemListAction(items))
        })
    }, [])

    useEffect(() => {
        console.log(state.length)
    }, state)

    if (state.length < 1)
        return null;

    const likeStatus = (liked) => {
        return !liked
            ? <img src="/like-empty.svg" width='30' height='30' alt="" />
            : <img src="/like-liked.svg" width='30' height='30' alt="" />
    }

    const onToggleClick = id => dispatch(toggleItemAction(id))

    const onDeleteItem = id => {
        dispatch(deleteItemAction(id))
        console.log('deleted', state)
    }

    const showNoData = () => {
        return fState.length === 0 ? <div>No data</div> : <div></div>
    }

    return (
        <div className="container-fluid p-4 h-100 d-flex flex-column align-items-center">
            <button
                className='bg-warning py-2 px-4 rounded mb-3 position-absolute'
                style={{border: 'none', background: 'transparent', top: '15px', right: '40px'}}
                onClick={() => setFilter(!filter)}
            >{filterText} <img src="/like-liked.svg" width='30' alt=""/>
            </button>
            <div>
                {showNoData()}
                {fState.map((item) => {
                    return (
                        <div className='w-[500px] d-flex mb-3 align-items-center bg-light p-4' key={item.id} style={{borderRadius: '15px'}}>
                            <div className='p-3 bg-white rounded'>
                                <img className='border-warning'
                                     src={item.image}
                                     width='100' alt=""/>
                            </div>
                            <div className='container-fluid mx-3'>
                                {item.title}
                            </div>
                            <div>
                                <button
                                    style={{border: 'none', background: 'transparent'}}
                                    onClick={() => onToggleClick(item.id)}
                                >
                                    {likeStatus(item.liked)}
                                </button>
                            </div>
                            <div className='ms-4'>
                                <button
                                    style={{border: 'none', background: 'transparent'}}
                                    onClick={() => onDeleteItem(item.id)}
                                >
                                    <img src="/delete-button.svg" width='30' height='30' alt=""/>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}