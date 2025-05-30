import { Ipay, Ih5, Inative, Ijsapi, Iquery1, Iquery2, Itradebill, Ifundflowbill, Iapp, Ioptions, Irefunds1, Irefunds2, ICertificates } from './lib/interface';
import { IcombineH5, IcombineNative, IcombineApp, IcombineJsapi, IcloseSubOrders } from './lib/combine_interface';
import { BatchesTransfer, FindRefunds, ProfitSharing, Refunds, UploadImages } from './lib/interface-v2';
import { TransferBills } from './lib/interface-v3';
import { Base } from './lib/base';
import { IPayRequest } from './lib/pay-request.interface';
declare class Pay extends Base {
    protected appid: string;
    protected mchid: string;
    protected serial_no: string;
    protected publicKey?: Buffer;
    protected privateKey?: Buffer;
    protected authType: string;
    protected httpService: IPayRequest;
    protected key?: string;
    protected static certificates: {
        [key in string]: string;
    };
    /**
     * 构造器
     * @param appid 直连商户申请的公众号或移动应用appid。
     * @param mchid 商户号
     * @param publicKey 公钥
     * @param privateKey 密钥
     * @param options 可选参数 object 包括下面参数
     *
     * @param serial_no  证书序列号
     * @param authType 可选参数 认证类型，目前为WECHATPAY2-SHA256-RSA2048
     * @param userAgent 可选参数 User-Agent
     * @param key 可选参数 APIv3密钥
     */
    constructor(appid: string, mchid: string, publicKey: Buffer, privateKey: Buffer, options?: Ioptions);
    /**
     * 构造器
     * @param obj object类型 包括下面参数
     *
     * @param appid 直连商户申请的公众号或移动应用appid。
     * @param mchid 商户号
     * @param serial_no  可选参数 证书序列号
     * @param publicKey 公钥
     * @param privateKey 密钥
     * @param authType 可选参数 认证类型，目前为WECHATPAY2-SHA256-RSA2048
     * @param userAgent 可选参数 User-Agent
     * @param key 可选参数 APIv3密钥
     */
    constructor(obj: Ipay);
    /**
     * 自定义创建http 请求
     */
    createHttp(service: IPayRequest): void;
    /**
     * 获取微信平台key
     * @param apiSecret APIv3密钥
     * @returns
     */
    get_certificates(apiSecret: string): Promise<ICertificates[]>;
    /**
     * 拉取平台证书到 Pay.certificates 中
     * @param apiSecret APIv3密钥
     * https://pay.weixin.qq.com/wiki/doc/apiv3/apis/wechatpay5_1.shtml
     */
    private fetchCertificates;
    /**
     * 验证签名，提醒：node 取头部信息时需要用小写，例如：req.headers['wechatpay-timestamp']
     * @param params.timestamp HTTP头Wechatpay-Timestamp 中的应答时间戳
     * @param params.nonce HTTP头Wechatpay-Nonce 中的应答随机串
     * @param params.body 应答主体（response Body），需要按照接口返回的顺序进行验签，错误的顺序将导致验签失败。
     * @param params.serial HTTP头Wechatpay-Serial 证书序列号
     * @param params.signature HTTP头Wechatpay-Signature 签名
     * @param params.apiSecret APIv3密钥，如果在 构造器 中有初始化该值(this.key)，则可以不传入。当然传入也可以
     */
    verifySign(params: {
        timestamp: string | number;
        nonce: string;
        body: Record<string, any> | string;
        serial: string;
        signature: string;
        apiSecret?: string;
    }): Promise<boolean>;
    /**
     * 敏感信息加密
     * @param str 敏感信息字段（如用户的住址、银行卡号、手机号码等）
     * @returns
     */
    publicEncrypt(str: string, wxPublicKey: Buffer, padding?: number): string;
    /**
     * 敏感信息解密
     * @param str 敏感信息字段（如用户的住址、银行卡号、手机号码等）
     * @returns
     */
    privateDecrypt(str: string, padding?: number): string;
    /**
     * 构建请求签名参数
     * @param method Http 请求方式
     * @param url 请求接口 例如/v3/certificates
     * @param timestamp 获取发起请求时的系统当前时间戳
     * @param nonceStr 随机字符串
     * @param body 请求报文主体
     */
    getSignature(method: string, nonce_str: string, timestamp: string, url: string, body?: string | Record<string, any>): string;
    protected sign(str: string): string;
    getSN(fileData?: string | Buffer): string;
    /**
     * SHA256withRSA
     * @param data 待加密字符
     * @param privatekey 私钥key  key.pem   fs.readFileSync(keyPath)
     */
    sha256WithRsa(data: string): string;
    /**
     * 获取授权认证信息
     * @param nonceStr  请求随机串
     * @param timestamp 时间戳
     * @param signature 签名值
     */
    getAuthorization(nonce_str: string, timestamp: string, signature: string): string;
    /**
     * 回调解密
     * @param ciphertext  Base64编码后的开启/停用结果数据密文
     * @param associated_data 附加数据
     * @param nonce 加密使用的随机串
     * @param key  APIv3密钥
     */
    decipher_gcm<T extends any>(ciphertext: string, associated_data: string, nonce: string, key?: string): T;
    /**
     * 参数初始化
     */
    protected buildAuthorization(method: string, url: string, params?: Record<string, any>): string;
    /**
     * h5支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_1.shtml
     */
    transactions_h5(params: Ih5): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单h5支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_2.shtml
     */
    combine_transactions_h5(params: IcombineH5): Promise<import("./lib/interface-v2").Output>;
    /**
     * native支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_1.shtml
     */
    transactions_native(params: Inative): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单native支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_5.shtml
     */
    combine_transactions_native(params: IcombineNative): Promise<import("./lib/interface-v2").Output>;
    /**
     * app支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_1.shtml
     */
    transactions_app(params: Iapp): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单app支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_1.shtml
     */
    combine_transactions_app(params: IcombineApp): Promise<import("./lib/interface-v2").Output>;
    /**
     * JSAPI支付 或者 小程序支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_1.shtml
     */
    transactions_jsapi(params: Ijsapi): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单JSAPI支付 或者 小程序支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_3.shtml
     */
    combine_transactions_jsapi(params: IcombineJsapi): Promise<import("./lib/interface-v2").Output>;
    /**
     * 查询订单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_2.shtml
     */
    query(params: Iquery1 | Iquery2): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单查询订单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_11.shtml
     */
    combine_query(combine_out_trade_no: string): Promise<import("./lib/interface-v2").Output>;
    /**
     * 关闭订单
     * @param out_trade_no 请求参数 商户订单号 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_3.shtml
     */
    close(out_trade_no: string): Promise<import("./lib/interface-v2").Output>;
    /**
     * 合单关闭订单
     * @param combine_out_trade_no 请求参数 总订单号 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_12.shtml
     * @param sub_orders array 子单信息
     */
    combine_close(combine_out_trade_no: string, sub_orders: IcloseSubOrders[]): Promise<import("./lib/interface-v2").Output>;
    /**
     * 申请交易账单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_6.shtml
     */
    tradebill(params: Itradebill): Promise<import("./lib/interface-v2").Output>;
    /**
     * 申请资金账单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_7.shtml
     */
    fundflowbill(params: Ifundflowbill): Promise<import("./lib/interface-v2").Output>;
    /**
     * 下载账单
     * @param download_url 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_8.shtml
     */
    downloadBill(download_url: string): Promise<import("./lib/interface-v2").Output>;
    /**
     * 申请退款
     * @param params 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_9.shtml
     */
    refunds(params: Irefunds1 | Irefunds2): Promise<Refunds.IOutput>;
    /**
     * 查询单笔退款
     * @documentation 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_10.shtml
     */
    find_refunds(out_refund_no: string): Promise<FindRefunds.IOutput>;
    /**
     * 发起商家转账零钱
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_1.shtml
     */
    batches_transfer(params: BatchesTransfer.Input): Promise<BatchesTransfer.IOutput>;
    /**
     * 微信批次单号查询批次单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_2.shtml
     */
    query_batches_transfer_list_wx(params: BatchesTransfer.QueryBatchesTransferByWx.Input): Promise<BatchesTransfer.QueryBatchesTransferByWx.IOutput>;
    /**
     * 微信明细单号查询明细单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_3.shtml
     */
    query_batches_transfer_detail_wx(params: BatchesTransfer.QueryBatchesTransferDetailByWx.Input): Promise<BatchesTransfer.QueryBatchesTransferDetailByWx.IOutput>;
    /**
     * 商家批次单号查询批次单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_5.shtml
     */
    query_batches_transfer_list(params: BatchesTransfer.QueryBatchesTransferList.Input): Promise<BatchesTransfer.QueryBatchesTransferList.IOutput>;
    /**
     * 商家明细单号查询明细单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_6.shtml
     */
    query_batches_transfer_detail(params: BatchesTransfer.QueryBatchesTransferDetail.Input): Promise<BatchesTransfer.QueryBatchesTransferDetail.IOutput>;
    /**
     * 请求分账API
     * @param params
     * @returns
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_1.shtml
     */
    create_profitsharing_orders(params: ProfitSharing.CreateProfitSharingOrders.Input): Promise<ProfitSharing.CreateProfitSharingOrders.IOutput>;
    /**
     * 查询分账结果API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_2.shtml
     */
    query_profitsharing_orders(transaction_id: string, out_order_no: string): Promise<ProfitSharing.CreateProfitSharingOrders.IOutput>;
    /**
     * 请求分账回退API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_3.shtml
     */
    profitsharing_return_orders(params: ProfitSharing.ProfitSharingReturnOrders.Input): Promise<ProfitSharing.ProfitSharingReturnOrders.IOutput>;
    /**
     * 查询分账回退结果API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_4.shtml
     */
    query_profitsharing_return_orders(out_return_no: string, out_order_no: string): Promise<ProfitSharing.ProfitSharingReturnOrders.IOutput>;
    /**
     * 解冻剩余资金API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_5.shtml
     */
    profitsharing_orders_unfreeze(params: ProfitSharing.ProfitsharingOrdersUnfreeze.Input): Promise<ProfitSharing.ProfitsharingOrdersUnfreeze.IOutput>;
    /**
     * 查询剩余待分金额API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_6.shtml
     */
    query_profitsharing_amounts(transaction_id: string): Promise<ProfitSharing.QueryProfitSharingAmounts.IOutput>;
    /**
     * 添加分账接收方API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_8.shtml
     */
    profitsharing_receivers_add(params: ProfitSharing.ProfitSharingReceiversAdd.Input): Promise<ProfitSharing.ProfitSharingReceiversAdd.IOutput>;
    /**
     * 删除分账接收方API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_9.shtml
     */
    profitsharing_receivers_delete(params: ProfitSharing.ProfitSharingReceiversDelete.Input): Promise<ProfitSharing.ProfitSharingReceiversDelete.IOutput>;
    /**
     * 申请分账账单API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_11.shtml
     */
    profitsharing_bills(bill_date: string, tar_type?: string): Promise<ProfitSharing.ProfitSharingBills.IOutput>;
    upload_images(pic_buffer: Buffer, filename: string): Promise<UploadImages.IOutput>;
    /**
     * 商家转账用户确认模式下，用户申请收款时，商户可通过此接口申请创建转账单
     */
    transfer_bills(params: TransferBills.Input): Promise<TransferBills.IOutput>;
    /**
     * 商户通过转账接口发起付款后，在用户确认收款之前可以通过该接口撤销付款
     */
    transfer_cancel(params: TransferBills.CancelInput): Promise<TransferBills.CancelOutput>;
    /**
     * 商家转账用户确认模式下，根据商户单号查询转账单的详细信息
     */
    transfer_out_bill_no(params: TransferBills.OutBillNoInput): Promise<TransferBills.BillOutput>;
    /**
     * 商家转账用户确认模式下，根据微信转账单号查询转账单的详细信息
     */
    transfer_bill_no(params: TransferBills.BillNoInput): Promise<TransferBills.BillOutput>;
}
export = Pay;
