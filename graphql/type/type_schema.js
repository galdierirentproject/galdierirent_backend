const type = `
        scalar Date


        type Message {
            message : String,
            result: Boolean
        }
        input Message_input {
            message : String,
            result: Boolean
        }
        type Sha512 {
            salt : String
            passwordHash : String
        }
        input Sha512_input {
            salt : String
            passwordHash : String
        }
        type Navbar {
            primaryBackground: String
            secondaryBackground: String
            folded: Boolean
            hidden: Boolean
            position: String
            variant: String
        }
        type Toolbar {
            customBackgroundColor: Boolean
            background: String
            hidden: Boolean
            position: String
        }
        type Footer {
            customBackgroundColor: Boolean
            background: String
            hidden: Boolean
            position: String
        }
        type Sidepanel {
            hidden: Boolean
            position: String
        }
        type Layout {
            style: String
            width: String
            navbar:Navbar
            toolbar:Toolbar
            footer:Footer
            sidepanel:Sidepanel
        } 
        type Fuseconfig{
            colorTheme: String
            customScrollbars: Boolean
            layout:Layout
        }
        input Navbar_input {
            primaryBackground: String
            secondaryBackground: String
            folded: Boolean
            hidden: Boolean
            position: String
            variant: String
        }
        input Toolbar_input {
            customBackgroundColor: Boolean
            background: String
            hidden: Boolean
            position: String
        }
        input Footer_input {
            customBackgroundColor: Boolean
            background: String
            hidden: Boolean
            position: String
        }
        input Sidepanel_input {
            hidden: Boolean
            position: String
        }
        input Layout_input {
            style: String
            width: String
            navbar:Navbar_input
            toolbar:Toolbar_input
            footer:Footer_input
            sidepanel:Sidepanel_input
        }
        input Fuseconfig_input{
            colorTheme: String
            customScrollbars: Boolean
            layout:Layout_input
        }



        
    `;
module.exports = { type };