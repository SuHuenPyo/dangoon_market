import '../scss/ResponsiveVeiw.scss'

const ResponsiveView = ({children}) => {
    return (
        <div className='view'>
           {children}
        </div>
    )
}

export default ResponsiveView;