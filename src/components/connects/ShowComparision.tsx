import { Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState } from "react";
import ReactECharts from 'echarts-for-react';
import Multiselect from "multiselect-react-dropdown";
import { convertingIntoChild } from "../../utils";
import { ChartData, Formatter, User } from "../../interfaces/interface";



interface Profiles {
  profiles: User[];
}


export const ShowComparision = (props: Profiles) => {
  const { profiles = [] } = props;
  const [options, setOptions] = useState(Array<Object>);
  const [childData, setChildsData] = useState(Array<ChartData>);

  const formTree = () => {
    return options.map((item: Object) => {
      return <ReactECharts option={item}
      />
    });
  };

  const onSelect = (selectedList: String, selectedItem: User) => {
    const updatedData: Array<Object> = profiles.map((res: User) => {
      if (res.id === selectedItem.id) {
        const obj = { ...res };
        obj['isParent'] = true;
        return obj;
      }
      return res;
    });
    const finalTreeData: ChartData[] = convertingIntoChild(updatedData)
    const childsInfo: ChartData[] = childData;
    console.log(finalTreeData)
    finalTreeData.forEach((item: ChartData) => childsInfo.push(item));
    setChildsData(childsInfo);
    const finalInfo: Array<Object> = [];
    childData.forEach((item) => {
      const option: Object = {
        series: [
          {
            type: 'tree',
            data: [item],
            top: '0%',
            left: '10%',
            bottom: '20%',
            right: '26%',

            symbolSize: 0,
            initialTreeDepth: 9999,
            label: {
              color: '#fff',
              formatter: (v: Formatter) => {
                const nodeStyles = [
                  `{valueBg| ${+v.value || 0}%}`,
                  `{nodeBg| ${v.name.length > 7 ? v.name.substring(0, 7) + '...' : v.name
                  }}`,
                ].join(' ');
                const leafStyles = [
                  `{valueBg| ${+v.value || 0}%}`,
                  `{leafBg| ${v.name.length > 7 ? v.name.substring(0, 7) + '...' : v.name
                  }}`,
                ].join(' ');
                const styles = !!v.data.children ? nodeStyles : leafStyles;
                return styles;
              },
              rich: {
                valueBg: {
                  backgroundColor: 'rgba(0,23,11,0.3)',
                  align: 'center',
                  verticalAlign: 'middle',
                  borderRadius: 4,
                  width: 26,
                  padding: [4, 8],
                },
                nodeBg: {
                  backgroundColor: 'rgb(0, 191, 165)',
                  align: 'center',
                  width: 60,
                  padding: 12,
                  borderRadius: 12,
                  shadowBlur: 12,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#aaa',
                },
                leafBg: {
                  backgroundColor: 'rgb(255, 82, 82)',
                  align: 'center',
                  width: 60,
                  padding: 12,
                  borderRadius: 12,
                  shadowBlur: 12,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#aaa',
                },
              },
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
          },
        ],
      };
      finalInfo.push(option)
    })
    setOptions(finalInfo);
  }
  const onRemove = (selectedList: User[], selectedItem: { id: string }) => {
    const removeChildinfo: ChartData[] = childData.filter((item: ChartData) => item.id !== selectedItem.id);
    setChildsData(removeChildinfo);
    const finalInfo: Array<Object> = [];
    removeChildinfo.forEach((item) => {
      const option = {
        series: [
          {
            type: 'tree',
            data: [item],
            top: '0%',
            left: '10%',
            bottom: '20%',
            right: '26%',

            symbolSize: 0,
            initialTreeDepth: 9999,
            label: {
              color: '#fff',
              formatter: (v: Formatter) => {
                console.log(v)
                const nodeStyles = [
                  `{valueBg| ${+v.value || 0}%}`,
                  `{nodeBg| ${v.name.length > 7 ? v.name.substring(0, 7) + '...' : v.name
                  }}`,
                ].join(' ');
                const leafStyles = [
                  `{valueBg| ${+v.value || 0}%}`,
                  `{leafBg| ${v.name.length > 7 ? v.name.substring(0, 7) + '...' : v.name
                  }}`,
                ].join(' ');
                const styles = !!v.data.children ? nodeStyles : leafStyles;
                return styles;
              },
              rich: {
                valueBg: {
                  backgroundColor: 'rgba(0,23,11,0.3)',
                  align: 'center',
                  verticalAlign: 'middle',
                  borderRadius: 4,
                  width: 26,
                  padding: [4, 8],
                },
                nodeBg: {
                  backgroundColor: 'rgb(0, 191, 165)',
                  align: 'center',
                  width: 60,
                  padding: 12,
                  borderRadius: 12,
                  shadowBlur: 12,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#aaa',
                },
                leafBg: {
                  backgroundColor: 'rgb(255, 82, 82)',
                  align: 'center',
                  width: 60,
                  padding: 12,
                  borderRadius: 12,
                  shadowBlur: 12,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#aaa',
                },
              },
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
          },
        ],
      };
      finalInfo.push(option);
    });
    setOptions(finalInfo);
  }
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col lg='4'>
          <Multiselect
            options={profiles} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
            onSelect={onSelect}
            onRemove={onRemove}
            selectionLimit={2}
          />

        </Col>
      </Row>
      <Row>
        {formTree()}
      </Row>
    </>
  );
}

ShowComparision.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};
