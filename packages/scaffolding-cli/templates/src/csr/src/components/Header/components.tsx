import styled from "@emotion/styled"
import IconButton from "@material-ui/core/IconButton"

export const Wrapper = styled.div`
    background-color: blue;
    display: flex;
    flex-direction: row
    justify-content: space-between
    padding: 0.3rem
`

export const Logo = styled.img`
    height: 50px;
`

export const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin: auto;
`

export const MenuButton: React.ComponentType = styled(IconButton)`
    margin-left: 110px;
`
