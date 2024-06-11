import { Modal } from 'antd'
import { Button, Form } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, Col, Row } from 'antd'
import { Typography } from 'antd'
import { useGetPrivilegeGroupsQuery } from '../../privilege/_components/privilege_group/PrivilegeGroupEndpoint'
import { popupError, popupSuccess } from "../../../shared/Toast";
import LoadingUser from '../util/Loading'
import { IPrivilegeGroup } from '@/common/types/privilegeGroup.interface'
import {
  useGetPrivilegeUserQuery,
  useDeletePrivilegeUserMutation,
  useCreatePrivilegeUserMutation
} from '../PrivilegeUsersEndpoints'
import { IPrivilege } from '@/common/types/privilege.interface'
import { IPrivilegeUser } from '@/common/types/privilegeUser.interface'

interface IOptionTab {
  lable: string
  value: number
}
const { Title } = Typography

export default function PrivilegeUser() {
  const params = useParams()
  const optionCheckbox = (data: IPrivilege[]): IOptionTab[] | any => {
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }
  const [createPrivilegeUser, { isLoading: loadingCreatePrivilegeUser }] = useCreatePrivilegeUserMutation()
  const [deletePrivilegeUser] = useDeletePrivilegeUserMutation()
  const { data: listPrivilegeUsers, isLoading: loadingPrivilegeUsers, refetch } = useGetPrivilegeUserQuery(params.id)
  const { data: listPrivilegeGroup, isLoading: loadingListPrivilegeGroup , refetch : refetchPrivilegeGroup} = useGetPrivilegeGroupsQuery({})
  const [form] = Form.useForm()
  const defaultCheckbox = listPrivilegeUsers?.map((item: IPrivilegeUser) => {
    return item.privilegeId
  })

  const handleInitValue = (privileges: IPrivilege[]) => {
    return defaultCheckbox.map((item: number) => {
      if (privileges.some((obj) => obj.id == item)) {
        return item
      }
    })
  }

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('..')
  }
  const onSubmit = async (data: any) => {
    
    
    try {
      let arr: number[] = []
      Object.keys(data).forEach((key) => {
        if (data[key][0] != undefined && !arr.includes(data[key][0])) {
          arr = arr.concat(data[key])
        }
      })

   

      Promise.all(listPrivilegeUsers.map(async (item: IPrivilegeUser) => {
        await deletePrivilegeUser(Number(item.id))
      }))
      .then(() => {
          Promise.all( arr.map(async (item: number) => {
            const payload = {
              userId: Number(params.id),
              privilegeId: Number(item)
            }
            if(item) await createPrivilegeUser(payload);
          }))
          .then(async() => {
           
           
            await refetch();
            await refetchPrivilegeGroup();
            popupSuccess('Update privilege success')
          })
      })
      
    } catch (error) {
      popupError('Something went error')
    }
  
  }

  console.log(listPrivilegeUsers)
  if (loadingListPrivilegeGroup || loadingPrivilegeUsers) return <LoadingUser />
 
  return (
    <>
      <Modal
        okButtonProps={{ hidden: true }}
        width={1000}
        title='Add Privilege user'
        open={true}
        onCancel={handleCancel}
      >
        <Form layout='vertical' form={form} name='nest-messages' onFinish={onSubmit} style={{ maxWidth: 900 }}>
          <Row>
            {listPrivilegeGroup?.map((item: IPrivilegeGroup, key: number) => (
              <Col span={24} key={key}>
                <Title type='danger' level={5}>
                  {item.name}
                </Title>
                <Form.Item name={item.name} initialValue={handleInitValue(item.privileges as IPrivilege[])}>
                  <Checkbox.Group options={optionCheckbox(item.privileges as IPrivilege[])} />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item style={{ marginTop: '20px' }}>
            <Button
              loading={loadingCreatePrivilegeUser}
              disabled={loadingCreatePrivilegeUser}
              type='primary'
              htmlType='submit'
            >
              Update privilege
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
