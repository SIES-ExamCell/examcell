import { useRouter } from 'next/router'

const DepartmentProps = () => {
  const router = useRouter()
  const { dept } = router.query

  return <p>Dept: {dept}</p>
}

export default DepartmentProps