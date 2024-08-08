/* eslint-disable @next/next/no-img-element */
'use client';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useState } from 'react';
import { ZXOpenAPIService } from '../../demo/service/ZXOpenAPIService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { ChartData, ChartOptions } from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Chain Status',
            data: [75, 70, 89, 83, 88, 77, 95, 75, 79, 88, 99, 100],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [blocks, setBlocks] = useState<Models.Blocks[]>([]);
    const [transfers, setTransfers] = useState<Models.Transfers[]>([]);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ZXOpenAPIService.getBlocks().then((data) => setBlocks(data));
        ZXOpenAPIService.getTransfers().then((data) => setTransfers(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Finalized Blocks</span>
                            <div className="text-900 font-medium text-xl">24,392,707</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Staked / Bonded</span>
                            <div className="text-900 font-medium text-xl">8,160,446.996 / 8,245,753.548</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Transfers</span>
                            <div className="text-900 font-medium text-xl">7,650,339</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Inflation Rate</span>
                            <div className="text-900 font-medium text-xl">7.83%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>Latest Blocks</h5>
                    <DataTable value={blocks} rows={5} paginator responsiveLayout="scroll">
                        <Column field="blockNumber" header="Block#" />
                        <Column field="status" header="Status" />
                        <Column field="validator" header="Validator" />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>Transfers</h5>
                    <DataTable value={transfers} rows={5} paginator responsiveLayout="scroll">
                        <Column field="extrinsic" header="Extrinsic#" />
                        <Column field="from" header="From" />
                        <Column field="to" header="To" />
                        <Column field="for" header="ZXC" />
                    </DataTable>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
