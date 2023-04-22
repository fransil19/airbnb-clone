'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {IconType} from "react-icons";
import qs from "query-string"

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon : Icon, label, selected}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    //Define an empty query
    let currentQuery = {};

    //if there are params, parse them and make an objet with them
    if(params){
      currentQuery = qs.parse(params.toString())
    }

    //Add the category we selected to a new updated quey with the spreaded object with params
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    //check if the category is already selected, if selected remove it to deselect it
    if(params?.get('category') === label){
      delete updatedQuery.category;
    }

    //Generates an url with de query, if null skips it
    const url = qs.stringifyUrl({
      url:'/',
      query: updatedQuery
    }, { skipNull: true})

    //Redirects to the url
    router.push(url)

  },[label, params, router])
  
  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox