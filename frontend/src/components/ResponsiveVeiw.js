import style from '../asset/scss/ResponsiveVeiw.module.scss'

const ResponsiveView = ({children}) => {
    return (
        <div className={style.view}>
           {children}
        </div>
    )
}

export default ResponsiveView;