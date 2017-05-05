//操作符
text textarea 忽略掉的
number >,>=,<,<=,!=,==
singleSelect !=,==
mutilSelect 包含,不包含
date >,>=,<,<=,!=,==
dateRange >,>=,<,<=,!=,==
money >,>=,<,<=,!=,==

//单行输入框 text
{
	id:'xx1',
	label: 'xx',
	placeholder:'xx',//提示文字
	require: true,
	type: 'text'
}
//多行输入框 textarea
{
	id:'xx1',
	label: 'xx',
	placeholder:'xx',//提示文字
	require: true,
	type: 'textarea'
}
//数字输入框 number
{
	id:'xx1',
	label: 'xx',
	placeholder:'xx',//提示文字
	unit: 'xx',
	require: true,
	type: 'number'
}
//单选框 singleSelect
{
	id:'xx1',
	label: 'xx',
	options:[{
		id:'xx1',
		name: 'xx1'
	},{
		id:'xx1',
		name: 'xx1'
	}],//选项
	require: true,
	type: 'singleSelect'
}
//多选框 mutilSelect
{
	id:'xx1',
	label: 'xx',
	options:[{
		id:'xx1',
		name: 'xx1'
	},{
		id:'xx1',
		name: 'xx1'
	}],//选项
	require: true,
	type: 'mutilSelect'
}
//日期 date
{
	id:'xx1',
	label: 'xx',
	options:[{
		id:'YYYY-MM-DD hh:mm',
		name: '年-月-日 时:分'
	},{
		id:'YYYY-MM-DD',
		name: '年-月-日'
	}],//选项
	require: true,
	type: 'date'
}
//日期区间 dateRange
{
	id:'xx1',
	label: 'xx',
	title2: 'xx',
	options:[{
		id:'YYYY-MM-DD hh:mm',
		name: '年-月-日 时:分'
	},{
		id:'YYYY-MM-DD',
		name: '年-月-日'
	}],//选项
	require: true,
	type: 'dateRange'
}
//图片(涉及其他业务接口依赖暂不开放)
{
	type: 'image'
}
//明细
{
	id:'xx1',
	type: 'list',
		options: [{
		title: 'xx',
		placeholder:'xx',//提示文字
		statistics: true,
		require: true,
		type: 'money'
	},{
		title: 'xx',
		placeholder:'xx',
		require: true,
		type: 'text'
	}, {
		title: 'xx',
		placeholder:'xx',
		require: true,
		type: 'textarea'
	}, {
		title: 'xx',
		options:[{
			id:'YYYY-MM-DD hh:mm',
			name: '年-月-日 时:分'
		},{
			id:'YYYY-MM-DD',
			name: '年-月-日'
		}],//选项
		require: true,
		type: 'date'
	}]
}
//说明文字
{
	id:'xx1',
	type: 'desc',
	options: 'xxxxx'
}
//金额
{
	id:'xx1',
	label: 'xx',
	placeholder:'xx',//提示文字
	require: true,
	type: 'money'
}
//附件(涉及其他业务接口依赖暂不开放)
{
	type: 'file'
}