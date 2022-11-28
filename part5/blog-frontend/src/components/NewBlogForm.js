import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import { Button, Input } from "./styles/GeneralStyles.styled";

const NewBlogForm = ({ blogFormRef }) => {
    const titleField = useField("text");
    const authorField = useField("text");
    const urlField = useField("text");
    const fields = [titleField, authorField, urlField];

    const dispatch = useDispatch();

    const addNewBlog = async (event) => {
        event.preventDefault();

        dispatch(
            addBlog({
                title: titleField.value,
                author: authorField.value,
                url: urlField.value,
            })
        );

        fields.forEach((field) => field.reset());

        blogFormRef.current.toggleVisibility();
        dispatch(
            setNotification({
                message: `Successfully added ${titleField.value} by ${authorField.value}`,
                success: true,
            })
        );
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNewBlog}>
                <div>
                    title:
                    <Input {...titleField.inputProp} name="Title" id="title-input" />
                </div>
                <div>
                    author:
                    <Input {...authorField.inputProp} name="Author" id="author-input" />
                </div>
                <div>
                    url:
                    <Input {...urlField.inputProp} name="URL" id="url-input" />
                </div>
                <Button id="create-blog-button" type="submit">
                    create
                </Button>
            </form>
        </>
    );
};

export default NewBlogForm;
