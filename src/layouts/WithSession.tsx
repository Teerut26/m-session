import { NextPage } from 'next'

interface Props {
    children: React.ReactNode
}

const WithSession: NextPage<Props> = ({children}) => {
    return (
        <>
        {children}
        </>
    )
}

export default WithSession