import React, {useEffect, useState} from 'react';
import { Box, Typography } from '@mui/material';
import OrderDetail from "@/src/components/OrderDetail";
import { useSnackbar } from 'notistack';

const SnapOrder = () => {
    const [url, setURL] = useState("");
    useEffect(() => {
        if (typeof window !== undefined) {
            setURL(window.location.href);
        }
    },[])

    const { enqueueSnackbar } = useSnackbar();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                width: '500' // 可以根据实际情况调整宽度
            }}
        >
            <Typography variant="h3" component="h2" sx={{ marginBottom: '20px' }}>
                Share with you friends
            </Typography>

            <OrderDetail /> {/* 在这里嵌入 OrderDetail 组件展示具体订单详情内容 */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: '20px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginTop: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}
                    >
                        <Typography variant="h5" component="p" sx={{marginRight: '10px'}}>
                            Shareable Link:
                        </Typography>

                        <input
                            type="text"
                            value={url}
                            readOnly
                            style={{
                                padding: '5px',
                                border: '1px solid lightgray',
                                borderRadius: '5px',
                                flex: 1,
                                width: '300px'
                            }}
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(url);
                                enqueueSnackbar('Link copied to clipboard!', {variant: 'success'});
                            }}
                            id="copyButton"
                            style={{
                                marginLeft: '10px',
                                padding: '5px 20px',
                                cursor: 'pointer',
                                borderRadius: '20px',
                                border: '1px solid lightgray',
                                backgroundColor: '#3337BF',
                            }}
                        >
                            Copy
                        </button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SnapOrder;