import React from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import withAdminAuth from "@/components/Auth/withAdminAuth";

const DashboardPage = () => {
    return (
        <>
            <Breadcrumb pageName="Home" />
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            </div>

            <div className="mt-6 px-6">
                <p className="text-lg text-black-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus purus sit amet nunc fermentum, eget aliquam eros viverra. Nulla ac sapien ut magna luctus tristique id vitae lorem. Donec consectetur vestibulum orci nec ullamcorper. Ut ac sapien eu lorem mollis facilisis nec vel odio. Integer laoreet magna eget tortor tristique, et bibendum risus malesuada. Integer in nunc vitae libero eleifend molestie. Donec et eros non velit rhoncus dictum.
                </p>
                <p className="mt-4 text-lg text-black-500">
                    Proin in elit nunc. In et bibendum mi, vel tincidunt odio. Aliquam in ultricies nunc, nec tempus quam. Integer fringilla, turpis eget condimentum venenatis, sem libero placerat ipsum, vitae egestas est eros at libero. Duis vulputate sapien et ante faucibus, nec luctus dui bibendum. Nam id tempus quam, vel venenatis mi. In aliquet sapien nunc, in venenatis velit tincidunt et. Duis et lacus ac lacus ullamcorper tempus. Ut scelerisque dui eget sapien vestibulum consequat.
                </p>
            </div>
        </>
    );
};

export default withAdminAuth(DashboardPage);
