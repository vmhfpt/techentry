import { Badge, Button, Card, Input, Upload } from 'antd'
import { FileImageOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import FirstHandle from './_components/First'
import getRandomNumber from '@/utils/randomNumber'
import SecondHandle from './_components/Second'
export default function Variant() {
  const ref = useRef<any>()
  const refSecond = useRef<any>()
  const [checkFirst, setCheckFirst] = useState<number>(0)
  const [nameFirst, setNameFirst] = useState<string>('')
  const [first, setFirst] = useState<any>(false)

  const [checkFirst2, setCheckFirst2] = useState<number>(0)
  const [second, setSecond] = useState<any>(false)
  const [nameSecond, setNameSecond] = useState<string>('')

  const [showAddSecond, setShowAddSecond] = useState<boolean>(false)

  const [formatVariant, setFormatVariant] = useState<any>([])

  const removeSecond = () => {
    setCheckFirst2(0)
    setSecond(false)
    setNameSecond('')
    setShowAddSecond(false)
  }

  useEffect(() => {
    if (first && second && second.value.length >= 2) {
      let newArr: any = []
      const firstArr = first.value
      const secondArr = second.value

      for (const item of firstArr) {
        if (item && item[first.name]) {
          for (const item1 of secondArr) {
            if (item1 && item1[second.name]) {
              newArr = [
                ...newArr,
                {
                  image: item.image,
                  price: 0,
                  quantity: 0,
                  SKU: '',
                  id: getRandomNumber(),
                  variant: [
                    {
                      [first.name]: item[first.name],
                      [second.name]: item1[second.name]
                    }
                  ]
                }
              ]
            }
          }
        }
      }
      setFormatVariant(newArr)
    } else if (first) {
      setFormatVariant(() => {
        return first.value
          .map((item: any) => {
            if (item[first.name]) {
              return {
                image: item.image,
                price: 0,
                quantity: 0,
                SKU: '',
                id: getRandomNumber(),
                variant: [
                  {
                    [first.name]: item[first.name]
                  }
                ]
              }
            } else {
              return null
            }
          })
          .filter((item: any) => item !== null)
      })
    }
  }, [first, second])

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current?.contains(event.target)) {
        if (nameFirst) {
          const numberId = getRandomNumber()
          setFirst({
            name: nameFirst,
            value: [
              {
                image: 'File',
                id: numberId,
                [nameFirst]: ''
              }
            ]
          })

          setCheckFirst(numberId)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, nameFirst])

  useEffect(() => {
    function handleClickOutside2(event: any) {
      if (refSecond.current && !refSecond.current?.contains(event.target)) {
        if (nameSecond) {
          const numberId = getRandomNumber()
          setSecond({
            name: nameSecond,
            value: [
              {
                id: numberId,
                [nameSecond]: ''
              }
            ]
          })

          setCheckFirst2(numberId)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside2)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside2)
    }
  }, [refSecond, nameSecond])

  console.log(formatVariant)

  return (
    <div className='app__variant'>
      <Badge status='processing' text='Phân loại hàng' />
      <Card size='small' title={first.name} className=' w-full my-3' style={{ background: '#F6F6F6' }}>
        {!first && (
          <div ref={ref} className='w-1/2 mb-4'>
            <Input placeholder='Nhập tên biến thể 1' onChange={(e) => setNameFirst(e.target.value)} />
          </div>
        )}
        <div className=' grid grid-cols-2 gap-4'>
          {first && (
            <FirstHandle first={first} setFirst={setFirst} checkFirst={checkFirst} setCheckFirst={setCheckFirst} />
          )}
        </div>
      </Card>

      {!showAddSecond && first && (
        <div className='my-5 bg-[#F6F6F6] p-3 rounded-[4px]'>
          <Button
            onClick={() => setShowAddSecond(true)}
            icon={<PlusOutlined />}
            type='dashed'
            className='w-[240px]'
            danger
          >
            Thêm nhóm phân loại 2
          </Button>
        </div>
      )}

      {showAddSecond && (
        <Card size='small' title={second.name} className=' w-full my-3 relative' style={{ background: '#F6F6F6' }}>
          <div
            onClick={() => removeSecond()}
            className=' absolute top-[-5px] right-[-5px] text-[20px] text-white bg-black rounded-full w-[20px] h-[20px] flex items-center justify-center'
          >
            {' '}
            &times;{' '}
          </div>
          <div className=' grid grid-cols-2 gap-4'>
            {!second && (
              <div className=' flex gap-[6px] items-center '>
                <div ref={refSecond} className='w-full'>
                  <Input onChange={(e) => setNameSecond(e.target.value)} placeholder='Nhập tên biến thể 2' />
                </div>

                <div className='w-[50px] cursor-pointer'></div>
              </div>
            )}

            {second && (
              <SecondHandle
                second={second}
                setSecond={setSecond}
                checkFirst2={checkFirst2}
                setCheckFirst2={setCheckFirst2}
              />
            )}
          </div>
        </Card>
      )}


     
      <Badge status='processing' text='Danh sách phân loại hàng' />

      <div className='bg-[#F6F6F6] p-3 rounded-[4px] my-3'>
        <table className='  w-full'>
          <thead>
            <tr>
              {first && <th className='flex justify-start'>
              
              <div className='p-3 '>
                <Badge status='processing' /> {first.name}
              </div>
            </th>}
              {second && <th>
                <div className='p-3 flex justify-start'> {second.name} </div>
              </th>}
              <th>
                
                <div className='p-3 flex justify-start w-full'>Giá</div>
              </th>
              <th>
               
                <div className='p-3 flex justify-start w-full'>Số lượng</div>
              </th>
              <th>
           
                <div className='p-3 flex justify-start w-full'>SKU</div>
              </th>
            </tr>
          </thead>
          <tbody className=''>
            {first && first.value.map((item : any, key : any) => {
                if(item[first.name]){
                    return (<tr key={key}>
                        <td className='p-3 text-center'>{item[first.name]}</td>
          
                       {second  &&    <td>
                          <div className=' flex flex-col gap-3 w-[90px]  h-[100%] '>
                             {
                                second?.value?.map((i : any, k : any) => {
                                    if(i[second.name]){
                                        return (<span key={k} className='p-2'>{i[second.name]}</span>)
                                    }else {
                                        return "";
                                    }
                                })
                             }
                            
                            
                          </div>
                        </td>}



                        <td>
                          <div className='p-3 flex flex-col gap-3 w-full'>
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                          </div>
                        </td>
                        <td>
                          <div className='p-3 flex flex-col gap-3 w-full'>
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                          </div>
                        </td>
          
                        <td>
                          <div className='p-3 flex flex-col gap-3 w-full'>
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                            <Input placeholder='0' />
                          </div>
                        </td>
                      </tr>)
                }else {
                    return "";
                }
            })}

           
          </tbody>
        </table>

      
      </div>



    </div>
  )
}
