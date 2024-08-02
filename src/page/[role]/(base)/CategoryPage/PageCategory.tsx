import { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SectionSliderCollections from '../components/SectionSliderLargeProduct'
import SectionPromo1 from '../components/SectionPromo1'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../../../../data/data'
import TabFilters from '../components/TabFilters'
import SidebarFilters from './SidebarFilters'
import { IProduct } from '@/common/types/product.interface'
import { useSearchParams } from 'react-router-dom'
import { useGetProductsQuery, useSearchProductMutation } from '../../(manager)/products/ProductsEndpoints'
import { useGetBrandsQuery } from '../../(manager)/brand/BrandEndpoints'
import { useGetCategoriesAttributesQuery } from '../../(manager)/attribute/_components/category_attribute/CategoryAttributeEndpoints'
import { useGetCategoriesQuery } from '../../(manager)/category/CategoryEndpoints'
import { VND } from '@/utils/formatVietNamCurrency'

export interface PageCategory {
  className?: string
}

const PageCategory: FC<PageCategory> = ({ className = '' }) => {
  const queryObj = useRef<any>({})
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<IProduct[]>([])

  const [filterProduct, { isLoading: isLoadingFiltrProduct }] = useSearchProductMutation()
  const { data: listBrands } = useGetBrandsQuery({})
  const { data: listCategory } = useGetCategoriesQuery({})
   const [data, setData] = useState<any>([]);
  const [categoryId, setCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [price, setPrice] = useState<any>(false)

  const handleFilterProduct = async (query: any) => {
   const response = await filterProduct(query).unwrap()
   setData(response.data)
    
  }

  useEffect(() => {
    handleFilterProduct({});
  }, [])
  useEffect(() => {
    if (categoryId) {
      queryObj.current = {
        ...queryObj.current,
        category: categoryId
      }

      handleFilterProduct(queryObj.current)
    }
    if (brandId) {
      queryObj.current = {
        ...queryObj.current,
        brand: brandId
      }
      handleFilterProduct(queryObj.current)
    }
    if (price) {
      queryObj.current = {
        ...queryObj.current,
        min_price: price.min,
        max_price: price.max
      }
      handleFilterProduct(queryObj.current)
    }
  }, [categoryId, brandId, price])
  const onClearFilter = () => {
    queryObj.current = {};
    setCategoryId('')
   setBrandId('')
  setPrice(false)
    handleFilterProduct(queryObj.current)

  }
  return (
    <div className={`nc-PageCollection2 ${className}`} data-nc-id='PageCollection2'>
      <Helmet>
        <title>Category || Ciseco Ecommerce Template</title>
      </Helmet>

      <div className='container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28'>
        <div className='space-y-10 lg:space-y-14'>
          {/* HEADING */}

          <hr className='border-slate-200 dark:border-slate-700' />
          <main>


            <div className='flex gap-3 items-center'>
              {listBrands?.data.map((item, key) => (
                <>
                  {key === 0 && <span> Brands: </span>}
                  <div
                    onClick={() => setBrandId(item.name)}
                    key={key}
                    className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                  >
                    <span className='line-clamp-1 ml-2'>{item.name}</span>
                  </div>
                </>
              ))}
            </div>

            <div className='flex gap-3 mt-5 items-center'>
              {listCategory?.data.map((item, key) => (
                <>
                  {key === 0 && <span> Categories: </span>}
                  <div
                    onClick={() => setCategoryId(item.name)}
                    key={key}
                    className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                  >
                    <span className='line-clamp-1 ml-2'>{item.name}</span>
                  </div>
                </>
              ))}
            </div>

            <div className='flex gap-3 mt-5 items-center'>
              <>
                <span> Price: </span>
                <div
                  onClick={() => setPrice({min: 2000000, max: 4000000})}
                  className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                >
                  <span className='line-clamp-1 ml-2'>2 - 4tr</span>
                </div>

                <div
                 onClick={() => setPrice({min: 4000000, max: 8000000})}
                  className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                >
                  <span className='line-clamp-1 ml-2'>4 - 8tr</span>
                </div>

                <div
                onClick={() => setPrice({min: 8000000, max: 15000000})}
                  className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                >
                  <span className='line-clamp-1 ml-2'>8 - 15tr</span>
                </div>

                <div
                onClick={() => setPrice({min: 12000000, max: 500000000})}
                  className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500`}
                >
                  <span className='line-clamp-1 ml-2'>Trên 12tr</span>
                </div>
              </>
            </div>

              <div className='mt-5'>
              <div
                  onClick={() =>{ onClearFilter()}}
                  className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-fit px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 bg-black text-white`}
                >
                  <span className='line-clamp-1 ml-2'> Clear filter</span>
                </div>
              </div>
            <div className=' grid grid-cols-4 gap-3 mt-5'>
              {data.map((item: IProduct, index: number) => (
                <div key={index} className='my-5'>
                  {item && <ProductCard data={item} />}
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className='border-slate-200 dark:border-slate-700' />

        <SectionSliderCollections />
        <hr className='border-slate-200 dark:border-slate-700' />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  )
}

export default PageCategory
