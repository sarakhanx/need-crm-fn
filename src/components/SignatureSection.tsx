const SignatureSection = () => {
    return (
        <div className="w-full">
            <div className="flex-col justify-center">
          <div className="mt-12 w-full mx-auto">
            <div className="flex justify-between">
              <div className="w-1/2 text-center text-xs space-y-5">
                <p className="m-0 prompt-semibold">ผู้รับสินค้า</p>
                <p className="mb-1">
                _ _ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                </p>
                <p className="mb-1 prompt-semibold">
                  วันที่_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                </p>
              </div>
              <div className="w-1/2 text-center text-xs space-y-5">
                <p className="m-0 prompt-semibold">ผู้รับเงิน / ผู้ส่งสินค้า</p>
                <p className="mb-1">
_ _ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                </p>
                <p className="mb-1 prompt-semibold">
                  วันที่_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}
export default SignatureSection;