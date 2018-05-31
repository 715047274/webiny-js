import React from "react";
import { createComponent } from "webiny-app";

class EditorWidget extends React.Component {
    render() {
        const { modules: { Form }, widget, onChange, children, ...props } = this.props;
        return (
            <Form model={widget.data} onChange={onChange}>
                {({ Bind }) => (
                    <React.Fragment>
                        {React.cloneElement(children, { Bind, widget, onChange, ...props })}
                    </React.Fragment>
                )}
            </Form>
        );
    }
}

export default createComponent(EditorWidget, {
    modules: ["Form"],
    services: ["cms"]
});