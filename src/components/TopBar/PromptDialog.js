import React, {useState} from 'react'
import { CustomDialog, useDialog } from 'react-st-modal';
import styled from "@emotion/styled";

const Box = styled.div`
    display: flex;
    height: 40vh;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`

const Wrap = styled.div`
    width: 60%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`

const InputWrap = styled.div`
    display: flex;
    margin: 15px 0px;
    & > label {
        flex: 1;
        text-align: center;
        margin-right: 20px;
    }
    & > input {
        flex: 1;
    }
`

const Button = styled.button`
    background-color: green;
    border: none;
    padding: 20px;
    color: white;
    text-transform: uppercase;
`

function CustomDialogContent() {
    const dialog = useDialog();

    const [value, setValue] = useState(null);

    return (
        <Box>
            <form onSubmit={() => dialog.close(value)}>
            <Wrap>
                <InputWrap>
                    <label htmlFor={'category'}>Category</label>
                    <input
                        required={true}
                        type="text"
                        name={'category'}
                        onChange={(e) => {
                            setValue({
                                ...value,
                                category: e.target.value,
                            });
                        }}
                    />
                </InputWrap>
                <InputWrap>
                <label htmlFor={'description'}>Description</label>
                <input
                    required={true}
                    type="text"
                    name={'description'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            description: e.target.value,
                        });
                    }}
                />
                </InputWrap>
                <InputWrap>
                <label htmlFor={'boughtFrom'}>Bought From:</label>
                <input
                    required={true}
                    type="text"
                    name={'boughtFrom'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            boughtFrom: e.target.value,
                        });
                    }}
                />
                </InputWrap>
                <InputWrap>
                <label htmlFor={'discounts'}>Discounts</label>
                <input
                    required={true}
                    type="number"
                    name={'discounts'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            discounts: e.target.value,
                        });
                    }}
                />
                </InputWrap>
                <InputWrap>
                <label htmlFor={'amount'}>Amount</label>
                <input
                    required={true}
                    type="number"
                    name={'amount'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            amount: e.target.value,
                        });
                    }}
                />
                </InputWrap>
                <Button type={'submit'}>
                    Submit
                </Button>
            </Wrap>
        </form>
        </Box>
    );
}

function PromptDialog({ add }) {
    return (
        <div>
            <Button
                onClick={async () => {
                    const result = await CustomDialog(<CustomDialogContent />, {
                        title: 'Add Transition',
                        showCloseIcon: true,
                    });
                    if (result)
                        add(result);
                }}
            >
                Add Transference
            </Button>
        </div>
    );
}

export default PromptDialog
